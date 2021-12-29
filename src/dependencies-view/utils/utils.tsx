import { ChangeEvent, ReactElement } from 'react';
import { CommandKey, DependencyItemType, InstalledItemType, InstallKey } from './types';

const existRecursiveDependency = (
    item: string,
    dependenciesList: DependencyItemType[],
    outputContent: string[]
  ): boolean => {

    const words = item.split(' ');
    const nameItem = words[1];
    const dependencyItem = words[2];

    const dependenciesListFilter = dependenciesList.filter(depItem => depItem.dependencies.find(dep => dep === nameItem));

    if(dependenciesListFilter.find(item => item.name === dependencyItem)) {
      outputContent.push(item);
      outputContent.push(dependencyItem + ' depends on ' + nameItem + ', ignoring command');
      return true;
    } 
    
    return false;
}

const dependenciesFn = (
    item: string, 
    dependenciesList: DependencyItemType[], 
    outputContent: string[]
  ): void => {
   
  const words = item.split(' ');
  const dependencies: string[] = [];

  for (var i = 2; i < words.length; i++) {
    dependencies.push(words[i])
  }
  if(existRecursiveDependency(item, dependenciesList, outputContent)) {
    return;
  }

  outputContent.push(item);

  dependenciesList.push(
    {
      name: words[1],
      dependencies
    }
  )
}

const existInstall = (name: string, installedList: InstalledItemType[]): boolean => installedList.find(item => item.name === name) ? true : false;
const getDependencies = (name: string, dependenciesList: DependencyItemType[]): string[] | undefined => dependenciesList.find(item => item.name === name)?.dependencies;

const installFn = (
    name: string, 
    installType: InstallKey, 
    dependenciesList: DependencyItemType[], 
    installedList: InstalledItemType[], 
    outputContent: string[]
  ): void => {

  if(installType === InstallKey.EXPLICITLY){
    outputContent.push('INSTALL ' + name);
  }
  
  if(existInstall(name, installedList)) {
    if(installType === InstallKey.EXPLICITLY){
      outputContent.push(name + ' is already installed');
    }
    return;
  }

  const dependencies = getDependencies(name, dependenciesList);

  dependencies && dependencies.forEach(item => installFn(item, InstallKey.IMPLICITLY, dependenciesList, installedList, outputContent));

  
  outputContent.push('Installing ' + name);

  installedList.push(
    {
      name: name,
      installType
    }
  );
}

const listFn = (
    installedList: InstalledItemType[],
    outputContent: string[]
  ): void => {
  outputContent.push('LIST');
  installedList.forEach((item) => {
    outputContent.push(item.name);
  });
}

const isDependency = (name: string, dependenciesList: DependencyItemType[], installedList: InstalledItemType[]): boolean => {
  const dependenciesListFilter = dependenciesList.filter(depItem => depItem.dependencies.find(dep => dep === name));
  dependenciesListFilter.filter(depItem => installedList.find(instItem => instItem.name === depItem.name));
  dependenciesListFilter.filter(depItem => installedList.find(instItem => instItem.name === depItem.name));
  dependenciesListFilter.filter(depItem => installedList.find(instItem => instItem.name !== depItem.name));

  return dependenciesListFilter.length ? true : false;
}

const removeFn = (
    name: string, 
    installedList: InstalledItemType[], 
    dependenciesList: DependencyItemType[], 
    outputContent: string[],
    isDependencyItem: boolean
  ): void => {

  if(!isDependencyItem){
    outputContent.push('REMOVE ' + name);
  }

  if(!existInstall(name, installedList)){
    outputContent.push(name + ' is not installed');
    return;
  }

  if(!isDependencyItem && isDependency(name, dependenciesList, installedList)){
    if(!isDependencyItem){
      outputContent.push(name + ' is still needed');
    }
    return;
  }

  const dependencies = getDependencies(name, dependenciesList);
  dependencies && dependencies.forEach(item => {
    const dependenciesListFilter = dependenciesList.filter(depItem => depItem.name !== name);
    if(!isDependency(item, dependenciesListFilter, installedList)){
      removeFn(item, installedList, dependenciesList, outputContent, true)
    }
  });
 
  const index = installedList.findIndex((el) => el.name === name);
  installedList.splice(index, 1);
  outputContent.push('Removing ' + name);
}

const endFn = (outputContent: string[]): void => {
  outputContent.push('END');
}

export const handleOnChange = (
    event: ChangeEvent<HTMLInputElement>, 
    setInputContent: (content: string[]) => void,
    setOutputContent: (items: string[]) => void
    ): void => {
      
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
        return;
    }

    const file = input.files[0];
    var reader = new FileReader();    
    reader.onload = function(progressEvent){

      const fileReturn = this.result as string;

      const fileContentArray: string[] = fileReturn.split(/\r\n|\n/);
      setInputContent(fileContentArray);

      let dependenciesList: DependencyItemType[] = []
      let installedList: InstalledItemType[] = []
      let nameItem: string = '';
      let outputContent: string[] = [];

      fileContentArray.forEach((item) => {
        const commandItem = item.indexOf(' ') > 0 ? item.substring(0, item.indexOf(' ')) : item;
        switch (commandItem) {
          case CommandKey.DEPEND:
            dependenciesFn(item, dependenciesList, outputContent);
            break;
          case CommandKey.INSTALL:
            nameItem = item.split(' ')[1];
            installFn(nameItem, InstallKey.EXPLICITLY, dependenciesList, installedList, outputContent);
            break;
          case CommandKey.LIST:
            listFn(installedList, outputContent);
            break;
          case CommandKey.REMOVE:
            nameItem = item.split(' ')[1];
            removeFn(nameItem, installedList, dependenciesList, outputContent, false);
            break;
          case CommandKey.END:
            endFn(outputContent);
            break;
        }
      });

      setOutputContent(outputContent);
    };
    reader.readAsText(file);
}

export const showContent = (content: string[]): ReactElement => {
  return <ul>{content.map((item, index) => <li key={index}> {item} </li>)}</ul>;
}
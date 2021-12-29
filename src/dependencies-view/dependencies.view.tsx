import React, { ChangeEvent } from 'react';

import { handleOnChange } from './utils/utils';
import Input from './views/input';
import Output from './views/output';

const DependenciesView: React.FunctionComponent = () => {

    const [ inputContent, setInputContent ] =  React.useState<string[]>([]);
    const [ outputContent, setOutputContent ] =  React.useState<string[]>([]);

    const handleOnChangeFn = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        handleOnChange(input.files, setInputContent, setOutputContent);
    }
    
    return (
        <div>
            <p>
            Load Command List File:
            </p>
            <input type="file" name="file" id="file" onChange={handleOnChangeFn} />
            <p>Input Command List File:</p>
            <Input inputContent={inputContent}/>
            <br/>
            <br/>
            <p>Output Command List File:</p>
            <Output outputContent={outputContent}/>
        </div>
    );
  
}

export default DependenciesView;
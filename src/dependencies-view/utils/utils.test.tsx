import { handleOnChange, handleFileContentArray } from './utils';

// TODO: LOAD TO ENZYME/JEST CONFIG FILE
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Utils Test', () => {

    const setInputContentMock = jest.fn();
    const setOutputContentMock = jest.fn();

    it('Utils Test - handleOnChange', () => {
        const files = null;
        handleOnChange(files, setInputContentMock, setOutputContentMock)
        expect(setInputContentMock).not.toBeCalled();
        expect(setOutputContentMock).not.toBeCalled();
    });

    it('Utils Test - handleFileContentArray - empty', () => {
        const fileContentArray: string[] = [];
        handleFileContentArray(fileContentArray, setOutputContentMock)
        expect(setOutputContentMock).toBeCalledWith([]);
    });

    it('Utils Test - handleFileContentArray - END', () => {
        const fileContentArray: string[] = ['END'];        
        handleFileContentArray(fileContentArray, setOutputContentMock)
        expect(setOutputContentMock).toBeCalledWith(['END']);
    });

    it('Utils Test - handleFileContentArray - DEPEND', () => {
        const fileContentArray: string[] = ['DEPEND A B'];        
        handleFileContentArray(fileContentArray, setOutputContentMock)
        expect(setOutputContentMock).toBeCalledWith(['DEPEND A B']);
    });

    it('Utils Test - handleFileContentArray - DEPEND CONFLICT', () => {
        const fileContentArray: string[] = ['DEPEND A B', 'DEPEND B A'];        
        handleFileContentArray(fileContentArray, setOutputContentMock)
        expect(setOutputContentMock).toBeCalledWith(['DEPEND A B', 'DEPEND B A', 'A depends on B, ignoring command']);
    });

    it('Utils Test - handleFileContentArray - INSTALL', () => {
        const fileContentArray: string[] = ['INSTALL A'];        
        handleFileContentArray(fileContentArray, setOutputContentMock)
        expect(setOutputContentMock).toBeCalledWith(['INSTALL A', 'Installing A']);
    });

    it('Utils Test - handleFileContentArray - INSTALL WITH DEPEND', () => {
        const fileContentArray: string[] = ['DEPEND A B', 'INSTALL A'];        
        handleFileContentArray(fileContentArray, setOutputContentMock)
        expect(setOutputContentMock).toBeCalledWith(['DEPEND A B', 'INSTALL A', 'Installing B', 'Installing A']);
    });

    it('Utils Test - handleFileContentArray - LIST', () => {
        const fileContentArray: string[] = ['INSTALL A', 'INSTALL B', 'LIST'];        
        handleFileContentArray(fileContentArray, setOutputContentMock)
        expect(setOutputContentMock).toBeCalledWith(['INSTALL A', 'Installing A', 'INSTALL B', 'Installing B', 'LIST', 'A', 'B']);
    });

    it('Utils Test - handleFileContentArray - REMOVE', () => {
        const fileContentArray: string[] = ['INSTALL A', 'INSTALL B', 'REMOVE A', 'LIST'];        
        handleFileContentArray(fileContentArray, setOutputContentMock)
        expect(setOutputContentMock).toBeCalledWith(['INSTALL A', 'Installing A', 'INSTALL B', 'Installing B', 'REMOVE A', 'Removing A', 'LIST', 'B']);
    });


});
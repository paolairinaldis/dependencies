import React from 'react';
import { showContent } from '../utils/utils';

interface InputProps {
  inputContent: string[];
}

const Input: React.FunctionComponent<InputProps> = ({inputContent}) => {
    
    return (       
            <div className="Input">
              {showContent(inputContent)}
            </div>
    );  
}

export default Input;
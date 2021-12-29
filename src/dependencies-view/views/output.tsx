import React from 'react';
import { showContent } from '../utils/utils';

interface OutputProps {
    outputContent: string[];
}

const Output: React.FunctionComponent<OutputProps> = ({outputContent}) => {  
    return (       
            <div className="OutputView">
                {showContent(outputContent)}
          </div>
    );  
}

export default Output;
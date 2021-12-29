import React from 'react';
import { showContent } from '../utils/utils';

interface OutputProps {
    outpuContent: string[];
}

const Output: React.FunctionComponent<OutputProps> = ({outpuContent}) => {  
    return (       
            <div className="Output">
                {showContent(outpuContent)}
          </div>
    );  
}

export default Output;
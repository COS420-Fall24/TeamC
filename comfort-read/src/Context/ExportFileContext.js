import React, {createContext, useState} from 'react';
import {exportAsTxt, exportAsHtml} from "./exportFile"

const ExportFileContext=createContext();
function ExportFileProvider(props) {
    const[exportStatus, setExportStatus] = useState(false);
    const updateExportStatus = (status)=>{
        setExportStatus(status);
    };
    return(
        <ExportFileContext.Provider
            value={{
                exportAsTxt,
                exportAsHtml,
                exportStatus,
                updateExportStatus,
            }}
        > {props.children}
        </ExportFileContext.Provider>
    );
}
export {ExportFileContext, ExportFileProvider}

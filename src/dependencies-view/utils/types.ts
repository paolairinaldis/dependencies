// types

export enum CommandKey {
    DEPEND = 'DEPEND',
    INSTALL = 'INSTALL',
    REMOVE = 'REMOVE',
    LIST = 'LIST',
    END = 'END',
}

export enum InstallKey {
    EXPLICITLY = 'EXPLICITLY',
    IMPLICITLY = 'IMPLICITLY',
}

export type InstalledItemType = {
    name: string;
    installType: InstallKey;
};

export type DependencyItemType = {
    name: string;
    dependencies: string[];
    msg?: string; // TODO: dependencyError
};
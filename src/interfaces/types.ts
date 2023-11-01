import {IUser} from "../interfaces/User"

export type RootStackParamList = {
    Home: undefined;
    Settings: undefined;
    SportRecordList: {
        updateVal: boolean;
    } | undefined;
    AddExercise: {
        _id?: string;
        date?: string;
        description?: string;
        distance?: string;
        duration?: string;
        sport?: string;
    } | undefined;
    UserSettings: undefined;
    ChangePassword: undefined;
    RegisterUser: undefined;
}
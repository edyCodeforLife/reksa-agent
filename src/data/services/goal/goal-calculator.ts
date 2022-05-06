import {GoalCalculator} from './goal';
import {AxiosPromise} from 'axios';
import {DataService} from '../config';

export interface IGoalCalculatorDataService {
    Save(req : GoalCalculator) : AxiosPromise<GoalCalculator>;
    History() : AxiosPromise<GoalCalculator[]>;
    Latest() : AxiosPromise<GoalCalculator>;
    LatestActive() : AxiosPromise<GoalCalculator>;
    Discard() : void;
}

export class GoalCalculatorDataService implements IGoalCalculatorDataService {
    Save(req : GoalCalculator): AxiosPromise<GoalCalculator> {
        return DataService.post<GoalCalculator>("/goal/save", req);
    }

    History(): AxiosPromise<GoalCalculator[]> {
        return DataService.get<GoalCalculator[]>("/goal/get");
    }

    Latest() : AxiosPromise<GoalCalculator> {
        return DataService.get<GoalCalculator>("/goal/latest");
    }

    LatestActive() : AxiosPromise<GoalCalculator> {
        return DataService.get<GoalCalculator>("/goal/latest/active");
    }

    Discard(): void {
        DataService.post("/goal/discard");
    }
}
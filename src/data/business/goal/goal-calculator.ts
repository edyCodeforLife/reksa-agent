import {GoalCalculatorDataService, IGoalCalculatorDataService} from '../../services/goal/goal-calculator';
import {HandleError, IResponseError} from '../../services/error/response';
import {GoalCalculator} from '../../services/goal/goal';

export interface IGoalCalculatorSave extends IResponseError {
    Success?<T>(data: T): () => void;
}
export interface IGoalCalculatorDiscard extends IResponseError {
    Success?(): () => void;
}

export interface IGoalCalculatorService {
    Save(req: GoalCalculator, handler: IGoalCalculatorSave): Promise<any>;
    Latest(handler: IGoalCalculatorSave): Promise<any>;
    History(handler: IGoalCalculatorSave): Promise<any>;
    Discard(handler: IGoalCalculatorDiscard): Promise<any>;
}

export class GoalCalculatorService implements IGoalCalculatorService {
    private _goal: IGoalCalculatorDataService;

    constructor() {
        this._goal = new GoalCalculatorDataService();
    }

    async Save(req: GoalCalculator, handler: IGoalCalculatorSave) {
        try {
            let data = await this._goal.Save(req);
            return await handler.Success<GoalCalculator>(data.data);
        } catch (err) {
            return await HandleError(err, handler);
        }
    }

    async Latest(handler: IGoalCalculatorSave) {
        try {
            let data = await this._goal.Latest();
            return await handler.Success<GoalCalculator>(data.data);
        } catch (err) {
            return await HandleError(err, handler);
        }
    }

    async History(handler: IGoalCalculatorSave) {
        try {
            let data = await this._goal.History();
            return await handler.Success<GoalCalculator[]>(data.data);
        } catch (err) {
            return await HandleError(err, handler);
        }
    }

    async Discard(handler: IGoalCalculatorDiscard) {
        try {
            await this._goal.Discard();
            return await handler.Success();
        } catch (err) {
            return await HandleError(err, handler);
        }
    }
}
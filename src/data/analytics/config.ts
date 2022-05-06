import axios from 'axios';

export const BaseAnalyticsUrl = "https://an.moduit.id/";
export const AnalyticsLocalStorage = "AnalyticsId";
export const AnalyticsDataService = axios.create({baseURL: BaseAnalyticsUrl});
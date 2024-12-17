"use strict";
//export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = exports.Weather = exports.Visibility = void 0;
//export type Visibility = 'great' | 'good' | 'ok' | 'poor';
var Visibility;
(function (Visibility) {
    Visibility["Great"] = "great";
    Visibility["Good"] = "good";
    Visibility["Ok"] = "ok";
    Visibility["Poor"] = "poor";
})(Visibility || (exports.Visibility = Visibility = {}));
var Weather;
(function (Weather) {
    Weather["Sunny"] = "sunny";
    Weather["Rainy"] = "rainy";
    Weather["Cloudy"] = "cloudy";
    Weather["Stormy"] = "stormy";
    Weather["Windy"] = "windy";
})(Weather || (exports.Weather = Weather = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (exports.Gender = Gender = {}));

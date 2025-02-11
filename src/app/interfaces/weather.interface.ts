export interface WeatherResponse {
  current : {
    temp: number;
    feels_like : number ;
    humidity : number ;
    wind_speed : number ;
    weather :{
      main : string;
      description :string ;
      icon :string;
    }[];
  };
  daily: {
    dt:number;
    temp : {
      day: number;
      min:number;
      max: number;
    };
    weather : {
      main:string;
      description : string ;
      icon : string ;
    }[];
  }[];
}

export interface WeatherError {
  cod: string ;
  message : string;
}
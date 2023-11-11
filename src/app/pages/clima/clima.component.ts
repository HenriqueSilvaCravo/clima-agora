import { Component } from '@angular/core';
import { ClimaService } from 'src/app/service/clima.service';


@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent {

  city: string = '';
  weatherData: any;

  constructor(private climaService: ClimaService) {}

  getWeatherData(): void {
    if (this.city) {
      this.climaService.getWeather(this.city).subscribe(
        (data) => {
          this.weatherData = data;
        },
        (error) => {
          console.error(error);
          this.weatherData = null; // Define weatherData como null se houver um erro.
        }
      );
    }
  }

  convertKelvinToCelsius(kelvin: number): string {
    const celsius = kelvin - 273.15;
    return Math.round(celsius).toString();
  }

  convertMetersPerSecondToKilometersPerHour(metersPerSecond: number): string {
    // Converte para km/h e arredonda para o número inteiro mais próximo
    const kmPerHour = metersPerSecond * 3.6;
    return Math.round(kmPerHour).toString();
  }

  translateWeatherDescription(description: string): string {
    // Mapeie as descrições em inglês para português conforme necessário
    const translationMap: { [key: string]: string } = {
      'clear sky': 'céu limpo',
      'few clouds': 'poucas nuvens',
      'scattered clouds': 'nuvens dispersas',
      'broken clouds': 'nuvens quebradas',
      'shower rain': 'chuva',
      'rain': 'chuva',
      'thunderstorm': 'tempestade',
      'snow': 'neve',
      'mist': 'névoa',
    };

    // Se houver uma tradução disponível, use-a. Caso contrário, use a descrição original.
    return translationMap[description.toLowerCase()] || description;
  }

  getWeatherIconUrl(iconCode: string): string {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  }
}

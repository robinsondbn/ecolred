#include <OneWire.h>
#include <DHT.h>

#define DHTTYPE DHT22


int digital_Conexion = 4;
int analogous_Conexion = 0;


DHT dht(digital_Conexion, DHTTYPE);

void setup(){
  Serial.begin(115200);
  dht.begin();
  pinMode(analogous_Conexion, INPUT);
}

void loop(){
  //CalidadAire();
  //TemperaturaHumedad();
  
  //HumedadSuelo();
  delay(4000);
}

void HumedadSuelo(){
  int temperatura = analogRead(analogous_Conexion);
  int porcentaje = map(temperatura, 1023, 350, 0, 100);
  if(porcentaje > 100){
    porcentaje = 100;
  }
  Serial.print("Valor análogo: ");
  Serial.print(temperatura);
  Serial.print("     Valor porcentaje: ");
  Serial.print(porcentaje);
  Serial.println("%");
}

void CalidadAire(){
  int sensor_Value = analogRead(analogous_Conexion);
  float voltaje = sensor_Value * (5.0/1023.0);
  float Rs = 1000* ((5-voltaje)/voltaje);
  double alcohol = 0.4091*pow(Rs/5463, -1.497);

  Serial.print("adc: ");
  Serial.println(sensor_Value);
  Serial.print("Voltaje: ");
  Serial.println(voltaje);
  Serial.print("Rs: ");
  Serial.println(Rs);
  Serial.print("Alcohol: ");
  Serial.print(alcohol);
  Serial.println("mg/L");
  
}

void TemperaturaHumedad(){
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  Serial.print("Humedad: ");
  Serial.print(h);
  Serial.println("%");
  Serial.print("Temperatura: ");
  Serial.print(t);
  Serial.println("C°");
}

/*
#include <OneWire.h>
  
int DS18S20_Pin = 4; //DS18S20 Signal pin on digital 2
  
//Temperature chip i/o
OneWire ds(DS18S20_Pin);  // on digital pin 2
  
void setup(void) {
  Serial.begin(9600);
}
  
void loop(void) {
  float temperature = getTemp();
  Serial.println(temperature);
    
  delay(2000); //just here to slow down the output so it is easier to read
    
}
  
  
float getTemp(){
  //returns the temperature from one DS18S20 in DEG Celsius
  
  byte data[12];
  byte addr[8];
  
  if ( !ds.search(addr)) {
      //no more sensors on chain, reset search
      Serial.println("no more sensors on chain, reset search!");
      ds.reset_search();
      return -1000;
  }
  
  if ( OneWire::crc8( addr, 7) != addr[7]) {
      Serial.println("CRC is not valid!");
      return -1000;
  }
  
  if ( addr[0] != 0x10 && addr[0] != 0x28) {
      Serial.print("Device is not recognized");
      return -1000;
  }
  
  ds.reset();
  ds.select(addr);
  ds.write(0x44,1); // start conversion, with parasite power on at the end
  
  byte present = ds.reset();
  ds.select(addr);    
  ds.write(0xBE); // Read Scratchpad
  
    
  for (int i = 0; i < 9; i++) { // we need 9 bytes
    data[i] = ds.read();
  }
    
  ds.reset_search();
    
  byte MSB = data[1];
  byte LSB = data[0];
  
  float tempRead = ((MSB << 8) | LSB); //using two's compliment
  float TemperatureSum = tempRead / 16;
    
  return TemperatureSum;
    
}
*/

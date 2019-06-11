#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <Servo.h>

// Set these to run example.
#define FIREBASE_HOST "wifi-nodemcu-2a396.firebaseio.com"
#define FIREBASE_AUTH "OI9PLPF5U9ZzFaEQ0thL3CNfwIdY1PU3oaUZ4ghg"
#define WIFI_SSID "ROBIN"
#define WIFI_PASSWORD "Ieis55162!"

Servo Servo_1,Servo_2;
int angulo1 = 0;
int angulo2 = 0;

void setup() {
  Serial.begin(9600);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  Servo_1.attach(D1);
  Servo_2.attach(D2);
  Servo_1.write(0);
  Servo_2.write(0);
}

int n = 0;

void loop() {
  
  if (Firebase.failed()) {
      Serial.print("setting /servo failed:");
      Serial.println(Firebase.error());  
      return;
  }else{
    angulo1 = Firebase.getFloat("Servo_1");
    angulo2 = Firebase.getFloat("Servo_2");
    if(Servo_1.read() != angulo1){
      Servo_1.write(angulo1);
      Serial.println(Servo_1.read());
    }
    if(Servo_2.read() != angulo2){
      Servo_2.write(angulo2);
      Serial.println(Servo_2.read());
    }
  }
  
 /* 
  // set value
  Firebase.setFloat("number", 42.0);
  // handle error
  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
  }
  delay(1000);
  
  // update value
  Firebase.setFloat("number", 43.0);
  // handle error
  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
  }
  delay(1000);

  // get value 
  Serial.print("number: ");
  Serial.println(Firebase.getFloat("number"));
  delay(1000);

  // remove value
  Firebase.remove("number");
  delay(1000);

  // set string value
  Firebase.setString("message", "hello world");
  // handle error
  if (Firebase.failed()) {
      Serial.print("setting /message failed:");
      Serial.println(Firebase.error());  
      return;
  }
  delay(1000);
  
  // set bool value
  Firebase.setBool("truth", false);
  // handle error
  if (Firebase.failed()) {
      Serial.print("setting /truth failed:");
      Serial.println(Firebase.error());  
      return;
  }
  delay(1000);

  // append a new value to /logs
  String name = Firebase.pushInt("logs", n++);
  // handle error
  if (Firebase.failed()) {
      Serial.print("pushing /logs failed:");
      Serial.println(Firebase.error());  
      return;
  }
  Serial.print("pushed: /logs/");
  Serial.println(name);
  delay(1000);*/
}

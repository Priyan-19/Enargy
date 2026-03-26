#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <time.h>
#include "mbedtls/sha256.h"

// ---------------- WIFI ----------------
const char* ssid = "1";
const char* password = "11111111";

// ---------------- SERVER ----------------
const char* serverName = "http://10.193.174.82:3000/api/energy";

// ---------------- AUTH ----------------
const char* apiKey = "EB_SECURE_KEY_123";

// ---------------- TIME ----------------
const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 19800;
const int daylightOffset_sec = 0;

// ---------------- LCD ----------------
LiquidCrystal_I2C lcd(0x27, 16, 2);

// ---------------- PINS ----------------
#define CURRENT_PIN 34
#define VOLTAGE_PIN 35

// ---------------- SETTINGS ----------------
String meterID = "MTR001";
bool testMode = false;

// ---------------- ENERGY ----------------
float totalEnergy = 0;

// ---------------- WIFI CONNECT ----------------
void connectWiFi() {
  Serial.print("Connecting WiFi");
  lcd.clear();
  lcd.print("Connecting WiFi");

  WiFi.begin(ssid, password);

  int retry = 0;
  while (WiFi.status() != WL_CONNECTED && retry < 20) {
    delay(500);
    Serial.print(".");
    retry++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConnected!");
    lcd.clear();
    lcd.print("WiFi OK");
  } else {
    Serial.println("\nFailed!");
    lcd.clear();
    lcd.print("WiFi Fail");
  }
}

// ---------------- TIME ----------------
String getTimestamp() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) return "N/A";

  char buffer[30];
  strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%S", &timeinfo);
  return String(buffer);
}

// ---------------- HASH ----------------
String generateHash(String data) {
  byte hash[32];
  mbedtls_sha256((const unsigned char*)data.c_str(), data.length(), hash, 0);

  String result = "";
  for (int i = 0; i < 32; i++) {
    char str[3];
    sprintf(str, "%02x", hash[i]);
    result += str;
  }
  return result;
}

// ---------------- SENSOR ----------------
float readVoltage() {
  float sum = 0;
  for (int i = 0; i < 50; i++) {
    sum += analogRead(VOLTAGE_PIN);
    delayMicroseconds(200);
  }
  return (sum / 50.0 / 4095.0) * 3.3;
}

float readCurrent() {
  float sum = 0;
  for (int i = 0; i < 50; i++) {
    sum += analogRead(CURRENT_PIN);
    delayMicroseconds(200);
  }
  float avg = sum / 50.0;
  return ((avg / 4095.0) * 3.3 - 2.5) / 0.185;
}

// ---------------- LCD ----------------
void displayData(float v, float i, float p) {
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("V:");
  lcd.print(v, 2);

  lcd.setCursor(9, 0);
  lcd.print("I:");
  lcd.print(i, 2);

  lcd.setCursor(0, 1);
  lcd.print("P:");
  lcd.print(p, 1);
}

// ---------------- SEND ----------------
void sendData(String payload) {

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi lost. Reconnecting...");
    connectWiFi();
    return;
  }

  HTTPClient http;
  http.begin(serverName);

  http.addHeader("Content-Type", "application/json");
  http.addHeader("x-api-key", apiKey);

  int httpCode = http.POST(payload);

  Serial.print("HTTP: ");
  Serial.println(httpCode);

  if (httpCode > 0) {
    String response = http.getString();
    Serial.println(response);
  }

  http.end();
}

// ---------------- SETUP ----------------
void setup() {
  Serial.begin(115200);

  lcd.init();
  lcd.backlight();

  connectWiFi();

  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
}

// ---------------- LOOP ----------------
void loop() {

  float voltage, current;

  if (testMode) {
    voltage = random(220, 240);
    current = random(0, 200) / 100.0;
  } else {
    voltage = readVoltage();
    current = readCurrent();
  }

  float power = voltage * current;

  // ---- ENERGY ----
  totalEnergy += (power * (10.0 / 3600.0));

  // ---- SERIAL FORMAT (MATCH YOUR OUTPUT) ----
  Serial.print("V: ");
  Serial.print(voltage);
  Serial.print(" | I: ");
  Serial.print(current);
  Serial.print(" | P: ");
  Serial.println(power);

  // ---- LCD ----
  displayData(voltage, current, power);

  // ---- TIMESTAMP ----
  String timestamp = getTimestamp();

  // ---- HASH ----
  String raw = meterID + timestamp + String(voltage) + String(current) + String(power);
  String hash = generateHash(raw);

  // ---- JSON ----
  StaticJsonDocument<300> doc;

  doc["meter_id"] = meterID;
  doc["timestamp"] = timestamp;
  doc["voltage"] = voltage;
  doc["current"] = current;
  doc["power"] = power;
  doc["energy_kwh"] = totalEnergy;
  doc["hash"] = hash;

  String jsonString;
  serializeJson(doc, jsonString);

  // ---- PRINT JSON (MATCH YOUR OUTPUT) ----
  Serial.println(jsonString);

  // ---- SEND ----
  sendData(jsonString);

  Serial.println("------------------------");

  delay(10000);
}

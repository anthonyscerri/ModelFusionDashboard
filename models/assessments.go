// models/tasks.go
package models

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

type Features struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	Type      string `json:"type"`
	Lat       string `json:"lat"`
	Lon       string `json:"lon"`
	Predicted string `json:"predicted"`
}

type Layers struct {
	Id      int        `json:"id"`
	Name    string     `json:"name"`
	Active  bool       `json:"active"`
	Feature []Features `json:"features"`
}

type Data struct {
	Map       string   `json:"map"`
	TileLayer string   `json:"tileLayer"`
	Layers    []Layers `json:"layers"`
}

func GetAnomaly() []Layers {
	db, err := sql.Open("sqlite3", "./models/reporting.db")

	DataRecord := Data{}
	record, err := db.Query("SELECT id,lat,long,timestamp,predicted FROM anomalies where predicted =3")
	if err != nil {
		log.Fatal(err)
	}
	defer record.Close()

	result := Layers{}
	for record.Next() {

		f := Features{}
		f.Type = "marker"
		record.Scan(&f.Id, &f.Lat, &f.Lon, &f.Name, &f.Predicted)
		result.Id = 0
		result.Name = "IMU - Depression"
		result.Active = false

		result.Feature = append(result.Feature, f)
	}

	DataRecord.Layers = append(DataRecord.Layers, result)

	record, err = db.Query("SELECT id,lat,long,timestamp,predicted FROM anomalies where predicted =4")
	if err != nil {
		log.Fatal(err)
	}
	defer record.Close()

	result = Layers{}
	for record.Next() {

		f := Features{}
		f.Type = "marker"
		record.Scan(&f.Id, &f.Lat, &f.Lon, &f.Name, &f.Predicted)
		result.Id = 1
		result.Name = "IMU - Speed bump"
		result.Active = false

		result.Feature = append(result.Feature, f)
	}
	DataRecord.Layers = append(DataRecord.Layers, result)

	record, err = db.Query("SELECT id,lat,long,timestamp,predicted FROM anomalies where predicted =5")
	if err != nil {
		log.Fatal(err)
	}
	defer record.Close()

	result = Layers{}
	for record.Next() {

		f := Features{}
		f.Type = "marker"
		record.Scan(&f.Id, &f.Lat, &f.Lon, &f.Name, &f.Predicted)
		result.Id = 2
		result.Name = "IMU - Smooth"
		result.Active = false

		result.Feature = append(result.Feature, f)
	}
	DataRecord.Layers = append(DataRecord.Layers, result)

	record, err = db.Query("SELECT a.id,a.lat,a.long,va.timestamp,va.predicted FROM vision_anomalies va, anomalies a where  va.timestamp = a.timestamp and va.predicted = 'crack'")
	if err != nil {
		log.Fatal(err)
	}
	defer record.Close()

	result = Layers{}
	for record.Next() {

		f := Features{}
		f.Type = "marker"
		record.Scan(&f.Id, &f.Lat, &f.Lon, &f.Name, &f.Predicted)
		result.Id = 3
		result.Name = "Vision - Crack"
		result.Active = false

		result.Feature = append(result.Feature, f)
	}
	DataRecord.Layers = append(DataRecord.Layers, result)

	record, err = db.Query("SELECT a.id,a.lat,a.long,va.timestamp,va.predicted FROM vision_anomalies va, anomalies a where  va.timestamp = a.timestamp and va.predicted = 'pothole'")
	if err != nil {
		log.Fatal(err)
	}
	defer record.Close()

	result = Layers{}
	for record.Next() {

		f := Features{}
		f.Type = "marker"
		record.Scan(&f.Id, &f.Lat, &f.Lon, &f.Name, &f.Predicted)
		result.Id = 4
		result.Name = "Vision - Pothole"
		result.Active = false

		result.Feature = append(result.Feature, f)
	}
	DataRecord.Layers = append(DataRecord.Layers, result)

	record, err = db.Query("SELECT a.id,a.lat,a.long,va.timestamp,va.predicted FROM vision_anomalies va, anomalies a where  va.timestamp = a.timestamp and va.predicted ='SB'")
	if err != nil {
		log.Fatal(err)
	}
	defer record.Close()

	result = Layers{}
	for record.Next() {

		f := Features{}
		f.Type = "marker"
		record.Scan(&f.Id, &f.Lat, &f.Lon, &f.Name, &f.Predicted)
		result.Id = 5
		result.Name = "Vision - Speed bump"
		result.Active = false

		result.Feature = append(result.Feature, f)
	}
	DataRecord.Layers = append(DataRecord.Layers, result)

	// Anomaly match
	record, err = db.Query("select a.id,a.lat,a.long,va.timestamp,'anomalyMatch'  from anomalies a, vision_anomalies va where a.timestamp = va.timestamp and a.predicted <> 5")
	if err != nil {
		log.Fatal(err)
	}
	defer record.Close()

	result = Layers{}
	for record.Next() {

		f := Features{}
		f.Type = "marker"
		record.Scan(&f.Id, &f.Lat, &f.Lon, &f.Name, &f.Predicted)
		result.Id = 6
		result.Name = "Anomaly match"
		result.Active = false

		result.Feature = append(result.Feature, f)
	}
	DataRecord.Layers = append(DataRecord.Layers, result)

	//depression
	record, err = db.Query("select a.id,a.lat,a.long,va.timestamp,'depressionMatch'  from anomalies a, vision_anomalies va where a.timestamp = va.timestamp and a.predicted <> 5 and a.predicted = 3 and va.predicted in ('crack','pothole')")
	if err != nil {
		log.Fatal(err)
	}
	defer record.Close()

	result = Layers{}
	for record.Next() {

		f := Features{}
		f.Type = "marker"
		record.Scan(&f.Id, &f.Lat, &f.Lon, &f.Name, &f.Predicted)
		result.Id = 7
		result.Name = "Depression match"
		result.Active = false

		result.Feature = append(result.Feature, f)
	}
	DataRecord.Layers = append(DataRecord.Layers, result)

	//Speed bump match
	record, err = db.Query("select a.id,a.lat,a.long,va.timestamp,'SBMatch'  from anomalies a, vision_anomalies va where a.timestamp = va.timestamp and a.predicted <> 5 and a.predicted = 4 and va.predicted = 'SB'")
	if err != nil {
		log.Fatal(err)
	}
	defer record.Close()

	result = Layers{}
	for record.Next() {

		f := Features{}
		f.Type = "marker"
		record.Scan(&f.Id, &f.Lat, &f.Lon, &f.Name, &f.Predicted)
		result.Id = 8
		result.Name = "Speed Bump match"
		result.Active = false

		result.Feature = append(result.Feature, f)
	}
	DataRecord.Layers = append(DataRecord.Layers, result)

	return DataRecord.Layers

}

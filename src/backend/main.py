from typing import List

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Trip(BaseModel):
    id: int
    destination: str
    country: str | None
    trip_start: str
    trip_end: str
    notified_users: List[str] = []


trips_data = [
    {
        "id": 1,
        "destination": "Rome",
        "country": "IT",
        "trip_start": "13-04-2025",
        "trip_end": "20-04-2025",
        "notified_users": [],
    },
    {
        "id": 2,
        "destination": "Madrid",
        "country": "ES",
        "trip_start": "07-06-2025",
        "trip_end": "12-07-2025",
        "notified_users": [],
    },
]

TRIPS = [Trip(**entry) for entry in trips_data]


@app.get("/")
def home():
    return {"Welcome to the cep-1 backend!"}


@app.get("/trips")
def read_trips():
    return TRIPS


@app.get("/trips/{trip_id}")
def read_trip(trip_id: int):
    for trip in TRIPS:
        if trip.id == trip_id:
            return trip

    return {"error": f"trip with id {trip_id} not found"}


@app.post("/trips/")
def create_trip(trip: Trip):
    for t in TRIPS:
        if trip.id == t.id:
            return {"error": "id already exists"}
    TRIPS.append(trip)
    return TRIPS


@app.delete("/trips/{trip_id}")
def delete_trip(trip_id: int):
    for t in TRIPS:
        if t.id == trip_id:
            TRIPS.remove(t)
            return {f"trip with id {trip_id} removed successfully"}
    return {"error": f"no trip with id {trip_id}"}

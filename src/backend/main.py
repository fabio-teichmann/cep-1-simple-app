import json
from typing import List, Optional
from uuid import UUID, uuid4

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Trip(BaseModel):
    id: UUID
    destination: str
    country: Optional[str]
    trip_start: str
    trip_end: str
    notified_users: List[str] = []


trips_data = [
    {
        "id": uuid4(),
        "destination": "Rome",
        "country": "IT",
        "trip_start": "2025-04-13",
        "trip_end": "2025-04-20",
        "notified_users": [],
    },
    {
        "id": uuid4(),
        "destination": "Madrid",
        "country": "ES",
        "trip_start": "2025-06-07",
        "trip_end": "2025-07-12",
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
def read_trip(trip_id: UUID):
    for trip in TRIPS:
        if trip.id == trip_id:
            return trip
    raise HTTPException(status_code=400, detail=f"no trip with id {trip_id}")


async def validate_trip(request: Request):
    raw_body = await request.body()
    try:
        trip = json.loads(raw_body)
        trip["id"] = uuid4()
        return Trip(**trip)
    except (json.JSONDecodeError, ValidationError) as e:
        raise HTTPException(status_code=404, detail=str(e))


@app.post("/trips/")
async def create_trip(trip: Trip = Depends(validate_trip)):
    TRIPS.append(trip)
    return TRIPS


@app.put("/trips/{trip_id}")
def edit_trip(trip_id: UUID, trip: Trip):
    for t in TRIPS:
        if trip_id == t.id:
            t.destination = trip.destination
            t.country = trip.country
            t.trip_start = trip.trip_start
            t.trip_end = trip.trip_end
            t.notified_users = trip.notified_users
            return
    raise HTTPException(status_code=400, detail=f"no trip with id {trip_id}")


@app.delete("/trips/{trip_id}")
def delete_trip(trip_id: UUID):
    for t in TRIPS:
        if t.id == trip_id:
            TRIPS.remove(t)
            return {f"trip with id {trip_id} removed successfully"}
    raise HTTPException(status_code=400, detail=f"no trip with id {trip_id}")

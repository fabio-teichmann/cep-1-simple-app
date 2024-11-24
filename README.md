# cep-1-simple-app
Cloud Engineering Project 1 - Simple web app using AWS architecture

## Goal of this project
- create simple architecture diagram leveraging AWS services
- setup 3 basic layers for a simple web app: (1) application layer, (2) networking layer, and (3) persistence layer
- learn how to setup and connect basic AWS services (compute + storage)
- learn about availability and scalability and how this can be achieved in AWS
- document steps and learnings along the way

## Intended steps (plan)
- research AWS components suitable for this project (S3, RDS, ...)
- learn about highly available and scalable applications in AWS
- draw an architecture diagram
- find a suitable simple app concept that facilitates CRUD operations with the persistence layer
- implement the achitecture in AWS (console)
- test the implementation
- document all relevant steps and learnings

## Phase 1 - Research
tbd

### Availability
An application/service is **highly available** if it can be served by some instance (at all times). 

For example, **AWS's RDS** (relational database service) provides several features that can ensure high availability of the service (in this case the access to a database):
- multi-AZ (availability zone) creation --> creates an additional instance in a different AZ to provide automatic failover in case something happens to the main instance.
- read-replica --> creates 1 (or more) copies of the database in the same or different AZ or even a different region. This eleviates read traffic from the main database instance. Replicas are asynchronously updated and synced with the main database to ensure they contain up-to-date data

## Phase 2 - Architecture design
tbd

## Phase 3 - Implementation
tbd

## Phase 4 - Testing
tbd

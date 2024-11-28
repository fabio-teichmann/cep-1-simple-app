# cep-1-simple-app
Cloud Engineering Project 1 - Simple web app using AWS architecture

## TL;DR

### Learnings
tbd

### Future work
tbd


## Short Description
This project features a simple web app UI that facilitates CRUD operations with a database and displays the results correctly.


## Goal of this Project
- create simple architecture diagram leveraging AWS services
- setup 3 basic layers for a simple web app: (1) application layer, (2) networking layer, and (3) persistence layer
- learn how to setup and connect basic AWS services (compute + storage)
- learn about availability and scalability and how this can be achieved in AWS
- document steps and learnings along the way


## Intended Steps (plan)
- research AWS components suitable for this project (S3, RDS, ...)
- learn about highly available and scalable applications in AWS
- draw an architecture diagram
- find a suitable simple app concept that facilitates CRUD operations with the persistence layer
- implement the achitecture in AWS (console)
- test the implementation
- document all relevant steps and learnings


## Phase 1 - Research
The research for this project explores the following areas: (i) hosting of an application (static vs. dynamic), (ii) storage, (iii) required networking (and security best-practices), (iv) the concepts of availability and scalability and how they can be applied to this project. Within each area, I will explore potential options and their suitability / trade-offs for this project.

### 💻 App Hosting
For hosting app (content) we need to distinguish two important concepts to determine the right hosting environment: (1) static website, and (2) dynamic website.

#### Static website
A static website contains only consists of up to 3 main files (`.js`, `.html`, and `.css`) that generate the webpage. Static does not mean that the website itself won't change. It means that the website's content is not created dynamically on the server-side. However, the content, generally, does not change frequently.

For static websites AWS offers a simple and cost-effective way of hosting it: through S3 bucket directly (static hosting).

#### Dynamic website
A dynamic website is generated "on-the-fly", meaning on the server-side at runtime. Whenever content on the webpage is generated dynamically - e.g. calls to an API and results are displayed, calls to a database - then it needs different hosting.

For dynamic websites AWS offers compute (**EC2**) resources that run the website content.


> [!NOTE]
> For this project we will use a **dynamic website** that can query and update database content.

> [!TIP]
> The database access can also be realized with a static website using cloud functions (Lambda) or calling the API of a backend that does the query work. The latter is a bit over the top for this minimal application. Using a Lambda function could be an interesting change to explore from both, a functionality perspective and a cost perspective. (Lambda functions are paid by execution)


### 💾 Storage
As a storage option I will explore AWS's **RDS** (relational database service) to spin up a basic PostgreSQL database. Next to being fully managed by AWS (i.e. patches, updates, recovery, etc.), an advantage relevant to this project it the possibility to set up fail-over databases. This means a separate instance of the same DB is created in a different availability zone (AZ) and synchronized with the main database. In case that the main DB fails (e.g. adverse climate), the connection gets switched to the failover DB and served from there until AZ1 becomes available again. This ensures high availability.

Additionally, it is possible to add _auto-scaling_ to an RDS database to dynamically add storage capacity when nearing the end of the current free space. This can be controlled setting a maximum threshold. Auto-scaling, obviously, can ensure the scalability of the storage component of this architecture.


### 🌐 Networking (and Security)
This project broadly needs to accomplish two things: (1) host a simple application in an open space, and (2) host a database that the application can connect to to perform basic CRUD operations. The application should be accessible from the internet (HTTP/HTTPS), whereas, for security reasons, the database should only be accesbile to the application itself (TCP❓). 

To accomplish this, I will set up a Virtual Private Cloud (**VPC**) with two **subnets**: one public (app), and the other private (db). The public subnet will require an **Internet Gateway** to be able to communicate with the internet. 
To facilitate the communication I will set up **Security Groups** that allow the accesses as described above.


### Availability & Scalability

#### Availability
An application/service is **highly available** if it can be served by some instance (at all times). 

For example, **AWS's RDS** (relational database service) provides several features that can ensure high availability of the service (in this case the access to a database):
- *multi-AZ* (availability zone) creation --> creates an additional instance in a different AZ to provide automatic failover in case something happens to the main instance.
- *read-replica* --> creates 1 (or more) copies of the database in the same or different AZ or even a different region. This eleviates read traffic from the main database instance. Replicas are asynchronously updated and synced with the main database to ensure they contain up-to-date data

#### Scalability
Refers to horizontal or vertical scaling of a service. **Horizontal scaling** means adding more instances of the same service (e.g. EC2 instances) to deal with the workload. **Vertical scaling** means an instance increases/decreases its performace internally (e.g. switching the EC2 type to a more powerful one).

#### Auto-scaling groups
AWS's **EC2** component offers another feature that offers both, availability, and scalability: _auto-scale groups_ (ASGs). An ASG allows to automatically spawn and re-spawn (in case of instance failure / unhealthiness) compute instances based on the configuration. This can happen in a single or multiple subnets, i.e. in a single or multiple AZs.

For ASGs the following needs to be available / specified:
- a template for compute instances (AMI - Amazon Machine Image) -> this will be the blueprint for each new instance launched
- subnets to provide component in
- min, desired, and max number of instances
- a **load balancer** to route traffic to the instances (!)



## Phase 2 - Architecture Design
For the architecture I created three different views: (1) a basic design to realize only the functionality for this project, (2) a design that is highly available, and (3) a design that is highly available and highly scalable.

> [!IMPORTANT]
> For the purpose of this project, I will implement a version of both, designs 2 and 3. I hope to gain relevant experience dealing with high availability and scalability in a fairly simple overall project.

### Basic design
![Basic Design](./img/cep-1-basic-design.png)

The basic design focuses on functionality only: dedicated VPC with public and private subnet, an Internet Gateway to facilitate access to the outside world, an EC2 instance to host the dynamic website, and an RDS (PostgreSQL) instance to handle the data and CRUD requests.

| :white_check_mark: Pros | :o: Short-comings |
| :-- | :-- |
| simple design that accomplishes the requirements | no mechanisms to handle potential failure of components |
| recommended isolation of data into private subnet (security) | no user authentication / no separation of user data |
| relatively cheap implementation | no resource handling for downtimes |


### Highly available design
![HA Design](./img/cep-1-ha.png)

This design includes a redundant EC2 instance in a differt AZ to increase availability as well as a load balancer to ensure traffic can be routed to these instances. The database has a failover instance in a different AZ to ensure availability of data, even if the main instance fails.

| :white_check_mark: Pros | :o: Short-comings |
| :-- | :-- |
| design that ensures high availability of the application |  |
| recommended isolation of data into private subnet (security) | no user authentication / no separation of user data |
| adequate cost-for-service balance ❓ |  |


### Highly available and highly scalable design
![HA-HS Design](./img/cep-1-ha-hs.png)

This design builds on the previous design but introduces auto scaling groups for the EC2 instances that host the website. This provides scalability to the aplication in case higher traffic occurs or is expected. However, this sophisticated design requires substantial (AWS) resources and may not be a good choice for the simplicity of the application.

| :white_check_mark: Pros | :o: Short-comings |
| :-- | :-- |
| sophisticated design for this use case; ensures both, high availability and high scalability | given the simplicity of the application, this is overkill (learning FTW) |
| recommended isolation of data into private subnet (security) | no user authentication / no separation of user data |
| can react to increasing/decreasing traffic | potentially costly |



## Phase 3 - Implementation
tbd



## Phase 4 - Testing
tbd



## Limitations & Potential Next Steps
tbd

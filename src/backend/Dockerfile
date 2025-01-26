FROM python:3.13-slim-bullseye

RUN apt-get update 
# RUN --mount=type=cache,target=/var/cache/apt,sharing=locked,id=apt \
#     apt update && \
#     apt install --no-install-recommends -y libpq-dev curl gnupg2 lsb-release apt-transport-https ca-certificates


# # Add the PGDG apt repo
# RUN echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list

# # Trust the PGDG gpg key
# RUN curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc| gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg

# RUN --mount=type=cache,target=/var/cache/apt,sharing=locked,id=apt \
#     apt update \
#     && apt -y install postgresql-16 \
#     && rm -rf /var/lib/apt/lists/*

# WORKDIR /backend

COPY ./requirements.txt ./backend/
RUN pip install --upgrade pip && pip install -r ./backend/requirements.txt

COPY . ./backend

EXPOSE 8000

CMD ["fastapi", "run", "backend/main.py"]
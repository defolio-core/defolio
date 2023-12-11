![GitHub issues](https://img.shields.io/github/issues/defolio-core/defolio)

# DeFolio

--------

## Quick Links
- [📹 Video Presentation](https://youtu.be/1A8dQlhts4Q)
- [📕 Pitch Deck](https://github.com/defolio-core/defolio/files/13630618/DeFolio.-.Pitch.Deck.pdf)
- [⚡️ Live Demo](https://defolio.xyz)

--------

## About
![DeFolio - Presentation](https://github.com/defolio-core/defolio/assets/101031495/6614ea1c-bfa9-4362-aecd-bd6e26aabce3)

DeFolio is a platform designed for writers and readers in the dynamic realm of Web3, powered by the Avalanche Blockchain.

At DeFolio, we're dedicated to fostering a thriving ecosystem where writers can create, share their content while offering readers a diverse array of engaging and decentralized literary works.

## Quick Start - Deploying the DeFolio

#### Requirements

- Docker
- Docker-Compose

#### 1 - Clone this repository:

```
git clone git@github.com:defolio-core/defolio.git
```

#### 2 - Update the following needed variables on `docker-compose.yaml`:


`.env`:

- VITE_WEB3_MODAL_PROJECT_ID
- VITE_WEB3_STORAGE_TOKEN 
- VITE_FACTORY_ADDRESS

`.env-api`:
- WEB3_PROVIDER_NETWORK
- WEB3_PROVIDER_LOCAL_URL
- WEB3_PROVIDER_TESTNET_URL
- WEB3_PROVIDER_MAINNET_URL


#### 3 - Run the docker-compose

```
docker-compose up

Creating defolio-db     ... done
Creating defolio-webapp ... done
Creating defolio-api    ... done
Creating defolio-nginx  ... done
Attaching to defolio-webapp, defolio-db, defolio-api, defolio-nginx
```

The DeFolio should be running at http://localhost

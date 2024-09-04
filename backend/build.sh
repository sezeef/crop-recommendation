#!/bin/bash
apt-get update && apt-get install -y build-essential libssl-dev libffi-dev python3-dev
pip install -r requirements.txt

#!/bin/sh

yarn start:containers -d

jest $@ --maxWorker=1 --runInBand
# M101P: MongoDB for Developers

## Warning! Contains spoilers.

```commandline
> python --version
Python 3.6.0

> docker --version
Docker version 1.13.1, build 092cba3727

# mongo --version
MongoDB shell version v3.4.2
git version: 3f76e40c105fc223b3e5aac3e20dcd026b83b38b
OpenSSL version: OpenSSL 1.0.1t  3 May 2016
allocator: tcmalloc
modules: none
build environment:
    distmod: debian81
    distarch: x86_64
    target_arch: x86_64
```

### init db
```commandline
$ docker run --name mongo-cont --expose 27017 -v /home/user/mongodatadb:/data/db -d mongo
$ docker exec -it mongo-cont bash
$ echo "172.17.0.2      mongo.localhost         mongo.loc" >> /etc/hosts 
```

### execute
```commandline
$ mongo < script.js
```
	

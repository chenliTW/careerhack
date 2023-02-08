#!/bin/bash

podhealth() {
        if [[ $MY_NODE_NAME -eq "node1" ]]
          then
            activepod=$(for i in 0 1; do echo careerhack-storage-$i;done | grep -v $HOSTNAME)
            curl -I $activepod.careerhack-storage.default.svc.cluster.local:8300
            if [[ $? -ne 0 ]]
              then
                return 0
              else
                return 1
            fi
          else
            return 1
        fi
}

podhealth

#!/bin/bash

podhealth() {
        if [[ $MY_NODE_NAME -eq "node2" ]]
          then
            activepod=$(for i in 0 1; do echo careerhack-inventory-$i;done | grep -v $HOSTNAME)
            curl -I $activepod.careerhack-inventory.default.svc.cluster.local:8200
            if [[ $? -ne 0 ]]
              then
                return 0
              else
                return 1
            fi
          else
            return 0
        fi
}

podhealth

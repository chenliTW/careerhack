#!/bin/bash

podhealth() {
	A="tsmchack2023-gce-grp4-5";
 # A="node5";
        if [[ "$MY_NODE_NAME" == "$A" ]];
          then
            activepod=$(for i in 0 1; do echo careerhack-inventory-$i;done | grep -v $HOSTNAME)
            curl -I $activepod.careerhack-inventory.default.svc.cluster.local:8200/api/health
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
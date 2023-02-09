#!/bin/bash

podhealth() {
        if [[ $MY_NODE_NAME -eq "node5" ]]
          then
            A=$(dig +short careerhack-inventory-0.careerhack-inventory.default.svc.cluster.local)
            B=$(dig +short careerhack-inventory-1.careerhack-inventory.default.svc.cluster.local)

            AA=$(echo $A | cut -d'.' -f3)
            BB=$(echo $B | cut -d'.' -f3)

            CC=$(echo $MY_IP | cut -d'.' -f3)

            if [ "$AA" -eq "$CC" ] || [ "$BB" -eq "$CC" ]
              then
                return 1
              else
                return 0
            fi
          else
            return 0
        fi
}

podhealth

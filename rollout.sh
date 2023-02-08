#!/bin/bash
before=$(cat /tmp/kbefore.txt)
if [ -n "$before" ] && [ $before -ne $(kubectl get node | grep " Ready" | wc -l) ]; then
  #kubectl rollout restart deployment careerhack-business
  sleep 20
  kubectl rollout restart statefulset.apps/careerhack-inventory
  kubectl rollout restart statefulset.apps/careerhack-storage
fi
echo $(kubectl get node | grep " Ready" | wc -l) > /tmp/kbefore.txt

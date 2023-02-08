#!/bin/bash
before=$(cat /tmp/kbefore.txt)

echo `expr $before`;
echo `expr $(kubectl get node | grep " Ready" | wc -l)`;

if [ -n "$before" ] && [ `expr $before` -lt `expr $(kubectl get node | grep " Ready" | wc -l)` ]; then
  #kubectl rollout restart deployment careerhack-business
  sleep 20
  kubectl rollout restart statefulset.apps/careerhack-inventory
  kubectl rollout restart statefulset.apps/careerhack-storage
fi
echo $(kubectl get node | grep " Ready" | wc -l) > /tmp/kbefore.txt
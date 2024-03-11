# architecture
![architecture diagram](https://github.com/phoqer/architecture/blob/main/Phoqer%20backend.jpg?raw=true)

handfull resources:
https://nicwortel.nl/blog/2022/continuous-deployment-to-kubernetes-with-github-actions
https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/deploy/installation/
https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md#iam-roles-for-service-accounts
https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/examples/echo_server/
https://eksctl.io/introduction/

to create secret for downloading images from github
```
kubectl create secret docker-registry ghcr-secret --docker-server=ghcr.io --docker-username=MarianMalvin --docker-password=<token-from-github-here> --docker-email=marian.zozulia@gmail.com
```

# Create K8S Cluster with Command : kind

## Create K8S Cluster
```
kind create cluster --config kind-cluster/kind-config.yaml --name my-k8s-cluster
```

## Install Ingress Nginx
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

## Wait Create Success
```
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s
```

## Load Image container to K8S Cluster
```
kind load docker-image <IMAGE_NAME>:<TAG> --name my-k8s-cluster
```

## Check Image on kind Cluster
```
docker exec -it my-k8s-cluster-control-plane crictl images
```

## Delete Kind Cluster
```
kind delete cluster --name my-k8s-cluster
```
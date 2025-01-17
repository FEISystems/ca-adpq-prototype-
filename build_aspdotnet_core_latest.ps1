
dotnet restore .\ca_proto

dotnet test .\ca_proto\ca_proto_tests  --configuration Debug

dotnet build .\ca_proto\ca_proto --configuration Debug

dotnet publish .\ca_proto\ca_proto\project.json --output .\release --configuration Debug

copy-item .\ca_proto\ca_proto\appSettings.latest.json .\release\appSettings.json
copy-item .\ca_proto\ca_proto\wwwroot .\release\wwwroot -recurse
copy-item .\ca_proto\ca_proto\Views .\release\Views -recurse

copy-item .\devops\Dockerfiles\Dockerfile-latest Dockerfile -Force
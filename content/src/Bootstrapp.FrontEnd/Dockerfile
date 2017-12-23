FROM  microsoft/aspnetcore-build:1.0-2.0 as BUILD
COPY ./ /apps
WORKDIR /apps
RUN bash -c "dotnet restore ./Bootstrapp.csproj && dotnet publish ./Bootstrapp.csproj -c Release -o ./obj/Docker/publish"

FROM microsoft/aspnetcore:2.0
WORKDIR /app
EXPOSE 80
COPY --from=BUILD /apps/obj/Docker/publish .
ENTRYPOINT ["dotnet", "Bootstrapp.dll"]
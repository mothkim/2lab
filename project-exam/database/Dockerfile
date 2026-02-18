FROM postgres:15

# Copy the init script from the host file
# This keeps the code in init.sql but avoids runtime volume permission issues
COPY init.sql /docker-entrypoint-initdb.d/init.sql

RUN chmod 644 /docker-entrypoint-initdb.d/init.sql
RUN chown postgres:postgres /docker-entrypoint-initdb.d/init.sql

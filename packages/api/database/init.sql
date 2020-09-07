create schema "okrdb";
SET search_path TO "okrdb";

create table if not exists "user"
(
    user_id    serial                  not null
        constraint "PK_758b8ce7c18b9d347461b30228d"
            primary key,
    first_name varchar                 not null,
    last_name  varchar                 not null,
    email      varchar                 not null
        constraint "UQ_e12875dfb3b1d92d7d7c5377e22"
            unique,
    salt       varchar                 not null,
    password   varchar                 not null,
    is_enabled boolean   default true  not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

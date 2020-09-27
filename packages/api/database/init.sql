create schema "okrdb";
SET search_path TO "okrdb";

create table "user"
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
    company_id integer                 not null,
    is_enabled boolean   default true  not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

create table company
(
    company_id serial                  not null
        constraint "PK_b7f9888ba8bd654c4860ddfcb3a"
            primary key,
    name       varchar                 not null
        constraint "UQ_a76c5cd486f7779bd9c319afd27"
            unique,
    is_enabled boolean   default true  not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

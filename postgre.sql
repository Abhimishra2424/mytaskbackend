SELECT
    "id",
    "taskCode",
    "title",
    "description",
    "status",
    "company_id",
    "companyName",
    "employeeCode",
    "employeeName",
    "employeeEmail",
    "createdAt",
    "updatedAt"
FROM
    "Task" AS "Task"
WHERE
    "Task"."company_id" = 2;

SELECT
    "id",
    "taskCode",
    "title",
    "description",
    "status",
    "company_id",
    "companyName",
    "employeeCode",
    "employeeName",
    "employeeEmail",
    "createdAt",
    "updatedAt"
FROM
    "Task" AS "Task"
WHERE
    (
        (
            "Task"."title" LIKE '%bug%'
            OR "Task"."description" LIKE '%bug%'
            OR "Task"."taskCode" LIKE '%bug%'
            OR "Task"."status" LIKE '%bug%'
            OR "Task"."employeeName" LIKE '%bug%'
            OR "Task"."employeeEmail" LIKE '%bug%'
        )
        AND "Task"."company_id" = 2
    );

UPDATE
    "Task"
SET
    "taskCode" = $ 1,
    "title" = $ 2,
    "description" = $ 3,
    "status" = $ 4,
    "company_id" = $ 5,
    "companyName" = $ 6,
    "employeeCode" = $ 7,
    "employeeName" = $ 8,
    "employeeEmail" = $ 9,
    "updatedAt" = $ 10
WHERE
    (
        "taskCode" = $ 11
        AND "company_id" = $ 12
    )

    
SELECT
    *
FROM
    "TaskHistory"
WHERE
    company_id = 2
    and status = 'done'

    delete from "Task" where id = 42;
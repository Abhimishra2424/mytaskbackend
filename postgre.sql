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
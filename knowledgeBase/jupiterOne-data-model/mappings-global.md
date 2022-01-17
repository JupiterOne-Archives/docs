# Global Mappings

## `jupiterone_account <-OWNS- <ROOT>`

## `security_policy <-HAS- <ROOT>`

## `(Service|Control|Team) -IMPLEMENTS-> security_procedure`

> **Source Filters**
>
>   * `function = !null`
>   * `inUse = !false`
>   * `active = !false`

> **Target Filters**
>
>   * `function = source.function`

## `employee <-EMPLOYS- <ROOT>`

## `Domain <-OWNS- <ROOT>`

## `Organization -HAS-> Person`

> **Target Filters**
>&nbsp;
>   * `email = source.members`

## `Team -HAS-> Person`

> **Target Filters**
>&nbsp;
>   * `email = source.members`

## `Team <-MANAGES- Person`

> **Target Filters**
>&nbsp;
>   * `email = source.supervisor`

## `Team <-HAS- Organization`

> **Source Filters**
>&nbsp;
>   * `organization = !null`

> **Target Filters**
>&nbsp;
>   * `_key = source.organization`

## `Team <-HAS- <ROOT>`

> **Source Filters**
>&nbsp;
>   * `organization = null`

## `Document <-APPROVED- Person`

> **Target Filters**
>&nbsp;
>   * `email = source.approvedBy`

## `Document <-CREATED- Person`

> **Target Filters**
>&nbsp;
>   * `email = source.createdBy`

## `Document <-UPDATED- Person`

> **Target Filters**
>&nbsp;
>   * `email = source.updatedBy`

## `(Account|Application|DataStore|Host|Product) <-MANAGES- (Person|Team|UserGroup)`

> **Target Filters**
>
>   * `_key = source.owner`

## `(Account|Application|DataStore|Host|Product) <-MANAGES- (Person|Team|UserGroup)`

> **Target Filters**
>&nbsp;
>   * `email = [toLowerCase(source.owner),toLowerCase(source.email)]`

## `Domain <-HAS- Organization`

> **Target Filters**
>&nbsp;
>   * `domains = source.name`

## `Domain <-MANAGES- Person`

> **Target Filters**
>&nbsp;
>   * `email = source.contactEmails`

## `DomainRecord -CONNECTS-> (Host|IpAddress|NetworkInterface|Gateway|Cluster)`

> **Source Filters**
>&nbsp;
>   * `type = (A|AAAA|CNAME)`

> **Target Filters**
>&nbsp;
>   * `publicIpAddress = source.value`

## `DomainRecord -CONNECTS-> (Gateway|Host|Cluster)`

> **Source Filters**
>&nbsp;
>   * `type = (A|AAAA|CNAME)`

> **Target Filters**
>&nbsp;
>   * `dnsName = source.value`

## `DomainRecord -CONNECTS-> (Gateway|Host|Cluster)`

> **Source Filters**
>&nbsp;
>   * `type = (A|AAAA|CNAME)`

> **Target Filters**
>&nbsp;
>   * `domainName = source.value`

## `DomainRecord -CONNECTS-> (Gateway|Host|Cluster)`

> **Source Filters**
>&nbsp;
>   * `type = (A|AAAA|CNAME)`

> **Target Filters**
>&nbsp;
>   * `aliases = source.value`

## `DomainRecord -CONNECTS-> (Gateway|Host|Cluster)`

> **Source Filters**
>&nbsp;
>   * `type = (A|AAAA|CNAME)`

> **Target Filters**
>&nbsp;
>   * `fqdn = source.value`

## `DomainRecord -CONNECTS-> DomainRecord`

> **Source Filters**
>&nbsp;
>   * `type = CNAME`

> **Target Filters**
>&nbsp;
>   * `name = source.value`

## `DomainZone <-HAS- Domain`

> **Target Filters**
>&nbsp;
>   * `name = source.parentDomain`

## `Certificate <-HAS- (Domain|DomainZone)`

> **Target Filters**
>&nbsp;
>   * `name = [source.domainName,source.alternativeNames]`

## `User -IS-> Person`

> **Target Filters**
>&nbsp;
>   * `email = toLowerCase(source.email)`

## `User -IS-> Person`

> **Target Filters**
>&nbsp;
>   * `username = toLowerCase(source.username)`

## `User -IS-> Person`

> **Target Filters**
>&nbsp;
>   * `aliases = toLowerCase(source.email)`

## `User -IS-> Person`

> **Target Filters**
>&nbsp;
>   * `name = source.name`

## `User -IS-> Person`

> **Target Filters**
>&nbsp;
>   * `displayName = source.displayName`

## `Person <-IS- User`

> **Target Filters**
>&nbsp;
>   * `email = source.email`

## `Person <-IS- User`

> **Target Filters**
>&nbsp;
>   * `username = source.email`

## `Person <-MANAGES- Person`

> **Target Filters**
>&nbsp;
>   * `employeeId = [toLowerCase(source.managerId),toLowerCase(source.manager)]`

## `Person <-MANAGES- Person`

## `Person <-MANAGES- Person`

> **Target Filters**
>&nbsp;
>   * `email = [toLowerCase(source.managerEmail),toLowerCase(source.manager)]`

## `Person <-MANAGES- Person`

> **Target Filters**
>&nbsp;
>   * `name = source.manager`

## `Person <-MANAGES- Person`

> **Target Filters**
>&nbsp;
>   * `displayName = source.manager`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>&nbsp;
>   * `id = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>&nbsp;
>   * `name = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>&nbsp;
>   * `fqdn = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>&nbsp;
>   * `hostname = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>&nbsp;
>   * `address = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>&nbsp;
>   * `ipAddress = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>&nbsp;
>   * `publicIpAddress = source.targets`

## `(Finding|Vulnerability) <-HAS- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>&nbsp;
>   * `privateIpAddress = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>&nbsp;
>   * `id = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>&nbsp;
>   * `name = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>&nbsp;
>   * `fqdn = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>&nbsp;
>   * `hostname = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>&nbsp;
>   * `address = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>&nbsp;
>   * `ipAddress = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>&nbsp;
>   * `publicIpAddress = source.targets`

## `(Finding|Vulnerability) <-HAD- Host`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>&nbsp;
>   * `privateIpAddress = source.targets`

## `(Finding|Vulnerability) <-HAS- (CodeRepo|Project|Application)`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>&nbsp;
>   * `name = source.targets`

## `Finding <-HAS- (Application)`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`

> **Target Filters**
>&nbsp;
>   * `id = source.targets`

## `(Finding|Vulnerability) <-HAD- (CodeRepo|Project|Application)`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>&nbsp;
>   * `name = source.targets`

## `(Finding|Vulnerability) <-HAS- CodeRepo`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = true`

> **Target Filters**
>&nbsp;
>   * `fullName = source.targets`

## `(Finding|Vulnerability) <-HAD- CodeRepo`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !qualys`
>   * `open = false`

> **Target Filters**
>&nbsp;
>   * `fullName = source.targets`

## `(Finding|Risk|Vulnerability) <-IDENTIFIED- Assessment`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !(azure|qualys)`

> **Target Filters**
>&nbsp;
>   * `name = source.assessment`

## `(Finding|Risk|Vulnerability) <-IDENTIFIED- Assessment`

> **Source Filters**
>&nbsp;
>   * `_integrationType = !(azure|qualys)`

> **Target Filters**
>&nbsp;
>   * `_key = source.assessment`

## `ThreatIntel <-HAS- Finding`

> **Target Filters**
>&nbsp;
>   * `qid = source.qid`

## `ThreatIntel <-HAS- Vulnerability`

> **Target Filters**
>&nbsp;
>   * `qid = source.qid`

## `Assessment <-PERFORMED- Person`

> **Target Filters**
>&nbsp;
>   * `email = [source.assessor,source.assessors]`

## `Assessment -TARGETS-> Vendor`

> **Target Filters**
>&nbsp;
>   * `name = source.vendor`

## `Device <-OWNS- Person`

> **Target Filters**
>&nbsp;
>   * `email = [toLowerCase(source.owner),toLowerCase(source.email),toLowerCase(source.username)]`

## `Device <-OWNS- Person`

> **Target Filters**
>&nbsp;
>   * `userId = [toLowerCase(source.username),toLowerCase(source.userId)]`

## `Device <-HAS- Person`

## `Device <-HAS- Person`

> **Target Filters**
>&nbsp;
>   * `email = toLowerCase(source.users)`

## `Vendor <-MANAGES- Person`

> **Target Filters**
>&nbsp;
>   * `email = [source.owner,source.owners,source.admins]`

## `Vendor <-APPROVES- PR`

> **Target Filters**
>&nbsp;
>   * `webLink = source.approvalPRLink`

## `Vendor <-APPROVES- PR`

> **Target Filters**
>&nbsp;
>   * `displayName = source.approvalPRName`

## `Account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = source.vendor`

> **Transferred Properties**
>&nbsp;
>   * `_type = toLowerCase(source.vendor)`
>   * `name = source.vendor`
>   * `displayName = source.vendor`

## `CodeRepo <-HAS- Application`

> **Target Filters**
>&nbsp;
>   * `name = source.application`

> **Transferred Properties**
>&nbsp;
>   * `name = source.application`

## `CodeRepo -DEFINES-> Function`

> **Target Filters**
>&nbsp;
>   * `name = [source.name,source.functions]`

## `Product -HAS-> Project`

> **Target Filters**
>&nbsp;
>   * `key = source.projectKey`

## `Module -REQUIRES-> Module`

> **Target Filters**
>&nbsp;
>   * `id = source.requires`
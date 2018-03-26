# SIDE integration

The maven plugin is setup to generate spings contexts in <modulePath>/side/ directory classPath 
To allow Alfresco to load them you must add in you module-context.xml file the following line :

```
<import resource="classpath:alfresco/module/${project.artifactId}/side/*/module-context.xml" />
```

You can overrides generated files by adding files in <modulePath>/side/
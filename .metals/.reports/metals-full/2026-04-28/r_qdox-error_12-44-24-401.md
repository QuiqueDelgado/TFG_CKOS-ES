error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/EmailService.java
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/EmailService.java
### com.thoughtworks.qdox.parser.ParseException: syntax error @[54,2]

error in qdox parser
file content:
```java
offset: 1809
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/EmailService.java
text:
```scala
package com.tfg.tienda.service;

import com.tfg.tienda.dto.ContactoDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String miCorreo;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarContacto(ContactoDTO dto) {
    System.out.println("📧 Enviando desde: " + miCorreo);
    try {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(miCorreo);        // ← añade esto
        msg.setTo(miCorreo);
        msg.setSubject("Nuevo mensaje de contacto — " + dto.getNombre());
        msg.setText(
            "Nombre: " + dto.getNombre() + "\n" +
            "Email: " + dto.getEmail() + "\n\n" +
            "Mensaje:\n" + dto.getMensaje()
        );
        mailSender.send(msg);
        System.out.println("✅ Correo enviado");
    } catch (Exception e) {
        System.out.println("❌ Error al enviar correo: " + e.getMessage());
        e.printStackTrace();
        throw new RuntimeException(e);
    }
}

public void enviarNewsletter(String emailSuscriptor) {
    try {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(miCorreo);        // ← añade esto también
        msg.setTo(miCorreo);
        msg.setSubject("Nueva suscripción al newsletter");
        msg.setText("Nuevo suscriptor: " + emailSuscriptor);
        mailSender.send(msg);
    } catch (Exception e) {
        System.out.println("❌ Error newsletter: " + e.getMessage());
        throw new RuntimeException(e);
    }
}@@
```

```



#### Error stacktrace:

```
com.thoughtworks.qdox.parser.impl.Parser.yyerror(Parser.java:2025)
	com.thoughtworks.qdox.parser.impl.Parser.yyparse(Parser.java:2147)
	com.thoughtworks.qdox.parser.impl.Parser.parse(Parser.java:2006)
	com.thoughtworks.qdox.library.SourceLibrary.parse(SourceLibrary.java:232)
	com.thoughtworks.qdox.library.SourceLibrary.parse(SourceLibrary.java:190)
	com.thoughtworks.qdox.library.SourceLibrary.addSource(SourceLibrary.java:94)
	com.thoughtworks.qdox.library.SourceLibrary.addSource(SourceLibrary.java:89)
	com.thoughtworks.qdox.library.SortedClassLibraryBuilder.addSource(SortedClassLibraryBuilder.java:162)
	com.thoughtworks.qdox.JavaProjectBuilder.addSource(JavaProjectBuilder.java:174)
	scala.meta.internal.mtags.JavaMtags.indexRoot(JavaMtags.scala:49)
	scala.meta.internal.metals.SemanticdbDefinition$.foreachWithReturnMtags(SemanticdbDefinition.scala:99)
	scala.meta.internal.metals.Indexer.indexSourceFile(Indexer.scala:560)
	scala.meta.internal.metals.Indexer.$anonfun$reindexWorkspaceSources$3(Indexer.scala:691)
	scala.meta.internal.metals.Indexer.$anonfun$reindexWorkspaceSources$3$adapted(Indexer.scala:688)
	scala.collection.IterableOnceOps.foreach(IterableOnce.scala:630)
	scala.collection.IterableOnceOps.foreach$(IterableOnce.scala:628)
	scala.collection.AbstractIterator.foreach(Iterator.scala:1313)
	scala.meta.internal.metals.Indexer.reindexWorkspaceSources(Indexer.scala:688)
	scala.meta.internal.metals.MetalsLspService.$anonfun$onChange$2(MetalsLspService.scala:940)
	scala.runtime.java8.JFunction0$mcV$sp.apply(JFunction0$mcV$sp.scala:18)
	scala.concurrent.Future$.$anonfun$apply$1(Future.scala:691)
	scala.concurrent.impl.Promise$Transformation.run(Promise.scala:500)
	java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1095)
	java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:619)
	java.base/java.lang.Thread.run(Thread.java:1447)
```
#### Short summary: 

QDox parse error in file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/EmailService.java
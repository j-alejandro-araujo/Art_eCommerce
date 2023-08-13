set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."products" (
	"productId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"price" numeric NOT NULL,
	"description" TEXT NOT NULL,
	"image" TEXT NOT NULL,
	"type" TEXT NOT NULL,
	"createdAt" TIMESTAMP DEFAULT NOW(),
	"updatedAt" TIMESTAMP DEFAULT NOW(),
	CONSTRAINT "products_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."user" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cartItems" (
	"cartItemId" serial NOT NULL,
	"productId" integer NOT NULL,
	"qty" numeric NOT NULL,
	"createdAt" TIMESTAMP DEFAULT NOW(),
	"modifiedAt" TIMESTAMP DEFAULT NOW(),
	"cartId" integer NOT NULL,
	CONSTRAINT "cartItems_pk" PRIMARY KEY ("cartItemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cart" (
	"cartId" serial NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "cart_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk0" FOREIGN KEY ("productId") REFERENCES "products"("productId");
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk1" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId");

ALTER TABLE "cart" ADD CONSTRAINT "cart_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");

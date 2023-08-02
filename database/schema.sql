set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Category" (
	"categoryId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"image" TEXT NOT NULL,
	"createdAt" TIMESTAMP DEFAULT NOW(),
	"updatedAt" TIMESTAMP DEFAULT NOW(),
	CONSTRAINT "Category_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Product" (
	"productId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"price" numeric NOT NULL,
	"description" TEXT NOT NULL,
	"image" TEXT NOT NULL,
	"type" TEXT NOT NULL,
	"createdAt" TIMESTAMP DEFAULT NOW(),
	"updatedAt" TIMESTAMP DEFAULT NOW(),
	"categoryId" integer NOT NULL,
	CONSTRAINT "Product_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."User" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	CONSTRAINT "User_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."CartItems" (
	"cartItemId" serial NOT NULL,
	"productId" integer NOT NULL,
	"qty" numeric NOT NULL,
	"createdAt" TIMESTAMP DEFAULT NOW(),
	"modifiedAt" TIMESTAMP DEFAULT NOW(),
	"cartId" integer NOT NULL,
	CONSTRAINT "CartItems_pk" PRIMARY KEY ("cartItemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Cart" (
	"cartId" serial NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "Cart_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Product" ADD CONSTRAINT "Product_fk0" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId");


ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_fk0" FOREIGN KEY ("productId") REFERENCES "Product"("productId");
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_fk1" FOREIGN KEY ("cartId") REFERENCES "Cart"("cartId");

ALTER TABLE "Cart" ADD CONSTRAINT "Cart_fk0" FOREIGN KEY ("userId") REFERENCES "User"("userId");

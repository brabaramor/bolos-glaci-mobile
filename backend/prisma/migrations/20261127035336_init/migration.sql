-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('new', 'in_production', 'ready', 'delivered', 'cancelled');

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cake_sizes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,

    CONSTRAINT "cake_sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cakes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "category_id" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cakes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cake_size_prices" (
    "cake_id" TEXT NOT NULL,
    "size_id" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "cake_size_prices_pkey" PRIMARY KEY ("cake_id","size_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "order_number" SERIAL NOT NULL,
    "status" "order_status" NOT NULL DEFAULT 'new',
    "cake_id" TEXT,
    "size_id" TEXT,
    "cake_name" TEXT NOT NULL,
    "size_name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "delivery_date" DATE NOT NULL,
    "preferred_time" TEXT,
    "customer_notes" TEXT NOT NULL DEFAULT '',
    "internal_notes" TEXT NOT NULL DEFAULT '',
    "customer_name" TEXT NOT NULL,
    "customer_phone" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "privacy_terms_accepted_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cake_sizes_name_key" ON "cake_sizes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cake_sizes_sort_order_key" ON "cake_sizes"("sort_order");

-- CreateIndex
CREATE INDEX "cakes_is_published_idx" ON "cakes"("is_published");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_number_key" ON "orders"("order_number");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "orders_created_at_idx" ON "orders"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- AddForeignKey
ALTER TABLE "cakes" ADD CONSTRAINT "cakes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cake_size_prices" ADD CONSTRAINT "cake_size_prices_cake_id_fkey" FOREIGN KEY ("cake_id") REFERENCES "cakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cake_size_prices" ADD CONSTRAINT "cake_size_prices_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "cake_sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cake_id_fkey" FOREIGN KEY ("cake_id") REFERENCES "cakes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

--Order numbers start at # 1024, como no Figma
ALTER SEQUENCE "orders_order_number_seq" RESTART WITH 1024;
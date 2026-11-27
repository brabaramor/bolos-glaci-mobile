-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "cake_sizes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

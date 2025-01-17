﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    public class OrderProduct
    {
        public int OrderId { get; set; }
        public DateTime CreateDate { get; set; }
        public OrderPaymentMethod PaymentMethod { get; set; }
        public OrderStatus Status { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string ProductType { get; set; }
        public string Contractor { get; set; }

        public static OrderProduct Read(MySql.Data.MySqlClient.MySqlDataReader reader)
        {
            OrderProduct result = new OrderProduct();
            result.OrderId = Read<int>(reader, "OrderID");
            result.CreateDate = Read<DateTime>(reader, "CreateDate");
            result.PaymentMethod = Read<OrderPaymentMethod>(reader, "PaymentMethod");
            var status = Read<OrderStatus>(reader, "Status");
            result.Status = Order.DisplayStatus(status, result.CreateDate); //for reports - show shipping status
            result.Price = Read<decimal>(reader, "Price");
            result.Quantity = Read<int>(reader, "Quantity");
            result.ProductType = Read<string>(reader, "ProductType");
            result.Contractor = Read<string>(reader, "Contractor");
            return result;
        }

        private static T Read<T>(MySql.Data.MySqlClient.MySqlDataReader reader, string name)
        {
            var o = reader[name];
            if (null == o || o == DBNull.Value)
                return default(T);
            return (T)o;
        }

        private static readonly object sync = new object();
        private static string query = null;
        public static string Query
        {
            get
            {
                if (null == query)
                {
                    lock (sync)
                    {
                        if (null == query)
                        {
                            StringBuilder temp = new StringBuilder();
                            temp.AppendLine("select o.Id as OrderID, o.CreateDate, o.PaymentMethod, o.Status, oi.Price, oi.Quantity, p.ProductType, p.Contractor");
                            temp.AppendLine("  from orders o");
                            temp.AppendLine("  left outer join orderitems oi on oi.OrderId = o.Id");
                            temp.AppendLine("  inner join products p on p.Id = oi.ProductId");//if products are deleted do not return matching rows
                            temp.AppendLine("  where o.CreateDate between @StartDate and @EndDate");
                            query = temp.ToString();
                        }
                    }
                }
                return query;
            }
        }
    }
}

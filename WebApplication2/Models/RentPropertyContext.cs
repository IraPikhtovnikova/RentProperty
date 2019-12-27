using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace RentProperty.Models
{
    public partial class RentPropertyContext : DbContext
    {
        public RentPropertyContext()
        {
        }

        public RentPropertyContext(DbContextOptions<RentPropertyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Client> Client { get; set; }
        public virtual DbSet<Deal> Deal { get; set; }
        public virtual DbSet<District> District { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<Propobj> Propobj { get; set; }
        public virtual DbSet<Realtor> Realtor { get; set; }
        public virtual DbSet<Request> Request { get; set; }
        public virtual DbSet<StatusD> StatusD { get; set; }
        public virtual DbSet<StatusR> StatusR { get; set; }
        public virtual DbSet<Typpe> Typpe { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=LAPTOP-1DU7GIL1;Initial Catalog=RentProperty;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.Fullname)
                    .IsRequired()
                    .HasColumnName("fullname")
                    .HasMaxLength(50);

                entity.Property(e => e.Passport)
                    .IsRequired()
                    .HasColumnName("passport")
                    .HasMaxLength(150);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("phone")
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Deal>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ddate)
                    .HasColumnName("ddate")
                    .HasColumnType("date");

                entity.Property(e => e.Enddate)
                    .HasColumnName("enddate")
                    .HasColumnType("date");

                entity.Property(e => e.Propobj).HasColumnName("propobj");

                entity.Property(e => e.Request).HasColumnName("request");

                entity.Property(e => e.Startdate)
                    .HasColumnName("startdate")
                    .HasColumnType("date");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.PropobjNavigation)
                    .WithMany(p => p.Deal)
                    .HasForeignKey(d => d.Propobj)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Deal_Propobj");

                entity.HasOne(d => d.RequestNavigation)
                    .WithMany(p => p.Deal)
                    .HasForeignKey(d => d.Request)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Deal_Request");

                entity.HasOne(d => d.StatusNavigation)
                    .WithMany(p => p.Deal)
                    .HasForeignKey(d => d.Status)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Deal_StatusD");
            });

            modelBuilder.Entity<District>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ddescr)
                    .HasColumnName("ddescr")
                    .HasMaxLength(500);

                entity.Property(e => e.Dname)
                    .IsRequired()
                    .HasColumnName("dname")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<News>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ndate)
                    .HasColumnName("ndate")
                    .HasColumnType("date");

                entity.Property(e => e.Ndescr)
                    .IsRequired()
                    .HasColumnName("ndescr")
                    .HasMaxLength(500);

                entity.Property(e => e.Nhead)
                    .IsRequired()
                    .HasColumnName("nhead")
                    .HasMaxLength(50);

                entity.Property(e => e.Nimg)
                    .HasColumnName("nimg")
                    .HasMaxLength(50);

                entity.Property(e => e.Nshort)
                    .IsRequired()
                    .HasColumnName("nshort")
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<Propobj>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Apartment).HasColumnName("apartment");

                entity.Property(e => e.Area)
                    .HasColumnName("area")
                    .HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Client).HasColumnName("client");

                entity.Property(e => e.District).HasColumnName("district");

                entity.Property(e => e.Floor).HasColumnName("floor");

                entity.Property(e => e.Floorscount).HasColumnName("floorscount");

                entity.Property(e => e.House)
                    .IsRequired()
                    .HasColumnName("house")
                    .HasMaxLength(20);

                entity.Property(e => e.Pdescr)
                    .HasColumnName("pdescr")
                    .HasMaxLength(500);

                entity.Property(e => e.Price)
                    .HasColumnName("price")
                    .HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Realtor).HasColumnName("realtor");

                entity.Property(e => e.Roomscount).HasColumnName("roomscount");

                entity.Property(e => e.Street)
                    .IsRequired()
                    .HasColumnName("street")
                    .HasMaxLength(50);

                entity.Property(e => e.Typpe).HasColumnName("typpe");

                entity.HasOne(d => d.ClientNavigation)
                    .WithMany(p => p.Propobj)
                    .HasForeignKey(d => d.Client)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Propobj_Client");

                entity.HasOne(d => d.DistrictNavigation)
                    .WithMany(p => p.Propobj)
                    .HasForeignKey(d => d.District)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Propobj_District");

                entity.HasOne(d => d.RealtorNavigation)
                    .WithMany(p => p.Propobj)
                    .HasForeignKey(d => d.Realtor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Propobj_Realtor");

                entity.HasOne(d => d.TyppeNavigation)
                    .WithMany(p => p.Propobj)
                    .HasForeignKey(d => d.Typpe)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Propobj_Typpe");
            });

            modelBuilder.Entity<Realtor>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.Fullname)
                    .IsRequired()
                    .HasColumnName("fullname")
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .HasColumnName("password")
                    .HasMaxLength(50);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("phone")
                    .HasMaxLength(20);

                entity.Property(e => e.Username)
                    .HasColumnName("username")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Request>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Areamax)
                    .HasColumnName("areamax")
                    .HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Areamin)
                    .HasColumnName("areamin")
                    .HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Client).HasColumnName("client");

                entity.Property(e => e.District).HasColumnName("district");

                entity.Property(e => e.Floormax).HasColumnName("floormax");

                entity.Property(e => e.Floormin).HasColumnName("floormin");

                entity.Property(e => e.Floorscountmax).HasColumnName("floorscountmax");

                entity.Property(e => e.Floorscountmin).HasColumnName("floorscountmin");

                entity.Property(e => e.Pricemax)
                    .HasColumnName("pricemax")
                    .HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Pricemin)
                    .HasColumnName("pricemin")
                    .HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Realtor).HasColumnName("realtor");

                entity.Property(e => e.Roomscountmax).HasColumnName("roomscountmax");

                entity.Property(e => e.Roomscountmin).HasColumnName("roomscountmin");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Typpe).HasColumnName("typpe");

                entity.HasOne(d => d.ClientNavigation)
                    .WithMany(p => p.Request)
                    .HasForeignKey(d => d.Client)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Request_Client");

                entity.HasOne(d => d.DistrictNavigation)
                    .WithMany(p => p.Request)
                    .HasForeignKey(d => d.District)
                    .HasConstraintName("FK_Request_District");

                entity.HasOne(d => d.RealtorNavigation)
                    .WithMany(p => p.Request)
                    .HasForeignKey(d => d.Realtor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Request_Realtor");

                entity.HasOne(d => d.StatusNavigation)
                    .WithMany(p => p.Request)
                    .HasForeignKey(d => d.Status)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Request_StatusR");

                entity.HasOne(d => d.TyppeNavigation)
                    .WithMany(p => p.Request)
                    .HasForeignKey(d => d.Typpe)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Request_Typpe");
            });

            modelBuilder.Entity<StatusD>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Sdescr)
                    .HasColumnName("sdescr")
                    .HasMaxLength(100);

                entity.Property(e => e.Sname)
                    .IsRequired()
                    .HasColumnName("sname")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<StatusR>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Sdescr)
                    .HasColumnName("sdescr")
                    .HasMaxLength(100);

                entity.Property(e => e.Sname)
                    .IsRequired()
                    .HasColumnName("sname")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Typpe>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Tdescr)
                    .HasColumnName("tdescr")
                    .HasMaxLength(500);

                entity.Property(e => e.Tname)
                    .IsRequired()
                    .HasColumnName("tname")
                    .HasMaxLength(50);
            });
        }
    }
}

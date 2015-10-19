namespace CastAKnowledgePros.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.VideoModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VidSource = c.String(),
                        VidTitle = c.String(),
                        VidDescription = c.String(),
                        VidCategory = c.String(),
                        VidAdded = c.DateTime(nullable: false),
                        VidLanguage = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.VideoReviewModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Rating = c.Int(nullable: false),
                        Body = c.String(),
                        ReviewerName = c.String(),
                        VideoModel_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.VideoModels", t => t.VideoModel_Id)
                .Index(t => t.VideoModel_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.VideoReviewModels", "VideoModel_Id", "dbo.VideoModels");
            DropIndex("dbo.VideoReviewModels", new[] { "VideoModel_Id" });
            DropTable("dbo.VideoReviewModels");
            DropTable("dbo.VideoModels");
        }
    }
}

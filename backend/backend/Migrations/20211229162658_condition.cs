using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class condition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "lastTimeWater",
                table: "DCandidates",
                type: "nvarchar(MAX)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "condition",
                table: "DCandidates",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "condition",
                table: "DCandidates");

            migrationBuilder.AlterColumn<string>(
                name: "lastTimeWater",
                table: "DCandidates",
                type: "nvarchar(50)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(MAX)",
                oldNullable: true);
        }
    }
}

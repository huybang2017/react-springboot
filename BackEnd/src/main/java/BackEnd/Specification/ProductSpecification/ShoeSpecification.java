package BackEnd.Specification.ProductSpecification;

import BackEnd.Entity.ProductEntity.Shoe;
import BackEnd.Entity.ProductEntity.ShoeSize;
import BackEnd.Form.ProductForm.ShoeForm.ShoeFilterForm;
import BackEnd.Other.Helper.StringHelper;
import com.mysql.cj.util.StringUtils;
import jakarta.persistence.criteria.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;


@Data
@AllArgsConstructor
public class ShoeSpecification implements Specification<Shoe> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    //Đây là phương thức ta dùng để custom filter
    public Predicate toPredicate(@NonNull  Root<Shoe> root,
                                 @NonNull  CriteriaQuery<?> query,
                                 @NonNull  CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("shoeId")){
            return criteriaBuilder.equal(root.get("shoeId") ,value);
        }

        if (field.equalsIgnoreCase("shoeName")){
            return criteriaBuilder.like(root.get("shoeName") ,"%" + value  + "%");
        }

        if (field.equalsIgnoreCase("status")){
            return criteriaBuilder.equal(root.get("status"), value);
        }

        if (field.equalsIgnoreCase("priority")){
            return criteriaBuilder.equal(root.get("priority"), value);
        }

        if (field.equalsIgnoreCase("minCreateDate")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("createDate").as(java.sql.Date.class) , (Date) value);
        }

        if (field.equalsIgnoreCase("maxCreateDate")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("createDate").as(java.sql.Date.class) , (Date) value);
        }

        if (field.equalsIgnoreCase("brandId")){
            return criteriaBuilder.equal(root.get("brand").get("brandId"), value);
        }

        if (field.equalsIgnoreCase("shoeTypeId")){
            return criteriaBuilder.equal(root.get("shoeType").get("shoeTypeId"), value);
        }

        if (field.equalsIgnoreCase("minPrice")) {
            // Tạo một subquery để lấy giá trị nhỏ nhất của price từ ShoeSize
            Subquery<Integer> subquery = query.subquery(Integer.class);

            // Tạo root cho subquery từ ShoeSize
            Root<ShoeSize> subRoot = subquery.from(ShoeSize.class);

            // Chọn giá trị nhỏ nhất của price trong subquery
            subquery.select(criteriaBuilder.min(subRoot.get("price")));

            // Điều kiện của subquery: shoeId của ShoeSize bằng shoeId của root (Shoe)
            subquery.where(criteriaBuilder.equal(subRoot.get("shoe").get("shoeId"), root.get("shoeId")));

            // Trả về điều kiện: giá trị của subquery phải lớn hơn hoặc bằng giá trị được cung cấp
            return criteriaBuilder.greaterThanOrEqualTo(subquery, (Integer) value);
        }

        if (field.equalsIgnoreCase("maxPrice")) {
            // Tạo một subquery để lấy giá trị nhỏ nhất của price từ ShoeSize
            Subquery<Integer> subquery = query.subquery(Integer.class);

            // Tạo root cho subquery từ ShoeSize
            Root<ShoeSize> subRoot = subquery.from(ShoeSize.class);

            // Chọn giá trị nhỏ nhất của price trong subquery
            subquery.select(criteriaBuilder.min(subRoot.get("price")));

            // Điều kiện của subquery: shoeId của ShoeSize bằng shoeId của root (Shoe)
            subquery.where(criteriaBuilder.equal(subRoot.get("shoe").get("shoeId"), root.get("shoeId")));

            // Trả về điều kiện: giá trị của subquery phải nhỏ hơn hoặc bằng giá trị được cung cấp
            return criteriaBuilder.lessThanOrEqualTo(subquery, (Integer) value);
        }

        if (field.equalsIgnoreCase("eventId")) {
            return criteriaBuilder.equal(root.join("sales").get("event").get("eventId"), value);
        }

        if (field.equalsIgnoreCase("colorId")) {
            return criteriaBuilder.equal(root.join("shoeColors").get("id").get("colorId"), value);
        }

//        if (field.equalsIgnoreCase("size")) {
//
//            // Create a subquery with Integer as the output type (for the size)
//            Subquery<Integer> subquery = query.subquery(Integer.class);
//
//            // Join with the ShoeSize table
//            Root<ShoeSize> subRoot = subquery.from(ShoeSize.class);
//
//            // Select the size from the ShoeSize table
//            subquery.select(subRoot.get("id").get("size"));
//
//            // Add conditions: shoeId of ShoeSize must match shoeId of Shoe and status = true
//            Predicate shoeIdCondition = criteriaBuilder.equal(subRoot.get("shoe").get("shoeId"), root.get("shoeId"));
//            Predicate statusCondition = criteriaBuilder.equal(subRoot.get("status"), true);
//
//            // Apply both conditions to the subquery
//            subquery.where(criteriaBuilder.and(shoeIdCondition, statusCondition));
//
//            // Compare the value of the size in the subquery with the provided value
//            return criteriaBuilder.equal(subquery, value);
//        }

        if (field.equalsIgnoreCase("size")) {

            // Perform a join between Shoe and ShoeSize tables
            Join<Shoe, ShoeSize> shoeSizeJoin = root.join("shoeSizes"); // Assuming "shoeSizes" is the correct mapping

            // Condition to match the size field
            Predicate sizeCondition = criteriaBuilder.equal(shoeSizeJoin.get("id").get("size"), value);

            // Condition to check that the status is true
            Predicate statusCondition = criteriaBuilder.isTrue(shoeSizeJoin.get("status"));

            // Combine the conditions
            return criteriaBuilder.and(sizeCondition, statusCondition);

        }

        // Nếu field là SpecialSort và value là PRICE_ASC, thực hiện sắp xếp theo giá thấp nhất
        if (field.equalsIgnoreCase("SpecialSort") && "price,asc".equals(value)) {
            // Tạo subquery để lấy giá nhỏ nhất từ ShoeSize
            Subquery<Integer> subquery = query.subquery(Integer.class);
            Root<ShoeSize> subRoot = subquery.from(ShoeSize.class);

            // Lấy giá trị nhỏ nhất của ShoeSize
            subquery.select(criteriaBuilder.min(subRoot.get("price")));
            subquery.where(criteriaBuilder.equal(subRoot.get("shoe").get("shoeId"), root.get("shoeId")));

            // Áp dụng Order By theo giá thấp nhất
            query.orderBy(criteriaBuilder.asc(subquery));
        }

        // Nếu field là SpecialSort và value là PRICE_ASC, thực hiện sắp xếp theo giá thấp nhất
        if (field.equalsIgnoreCase("SpecialSort") && "price,desc".equals(value)) {
            // Tạo subquery để lấy giá nhỏ nhất từ ShoeSize
            Subquery<Integer> subquery = query.subquery(Integer.class);
            Root<ShoeSize> subRoot = subquery.from(ShoeSize.class);

            // Lấy giá trị nhỏ nhất của ShoeSize
            subquery.select(criteriaBuilder.min(subRoot.get("price")));
            subquery.where(criteriaBuilder.equal(subRoot.get("shoe").get("shoeId"), root.get("shoeId")));

            // Áp dụng Order By theo giá thấp nhất
            query.orderBy(criteriaBuilder.desc(subquery));
        }


        return null;
    }


    public static Specification<Shoe> buildWhere(String search,
                                                 ShoeFilterForm form){
        Specification<Shoe> where = null;

        //Filter cho thanh tìm kiếm
        if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
            search = search.trim();
            ShoeSpecification shoeName = new ShoeSpecification("shoeName", StringHelper.removeAccents(search) );
            ShoeSpecification shoeId ;
            try{
                Integer num = Integer.parseInt(search);
                shoeId = new ShoeSpecification("shoeId", num);
                where = Specification.where(shoeName).or(shoeId);
            }catch (NumberFormatException e){
                where = Specification.where(shoeName);
            }
        }


        if (form != null){

            //Filter cho Combobox Status (Trạng thái)
            if (form.getStatus() != null){
                ShoeSpecification status = new ShoeSpecification("status", form.getStatus());
                if (where != null){
                    where = where.and(status);
                }else{
                    where = Specification.where(status);
                }
            }

            //Filter cho Combobox Priority (Độ ưu tiên)
            if (form.getPriority() != null){
                ShoeSpecification priority = new ShoeSpecification("priority", form.getPriority());
                if (where != null){
                    where = where.and(priority);
                }else{
                    where = Specification.where(priority);
                }
            }

            //Filter cho bộ lọc theo ngày ( Cận dưới )
            if (form.getMinCreateDate() != null){
                ShoeSpecification minCreateDate = new ShoeSpecification("minCreateDate", form.getMinCreateDate());
                if (where != null){
                    where = where.and(minCreateDate);
                }else{
                    where = Specification.where(minCreateDate);
                }
            }

            //Filter cho bộ lọc theo ngày ( Cận trên )
            if (form.getMaxCreateDate() != null){
                ShoeSpecification maxCreateDate = new ShoeSpecification("maxCreateDate", form.getMaxCreateDate());
                if (where != null){
                    where = where.and(maxCreateDate);
                }else{
                    where = Specification.where(maxCreateDate);
                }
            }

            //Filter cho bộ lọc theo thương hiệu
            if (form.getBrandId() != null){
                ShoeSpecification brandId = new ShoeSpecification("brandId", form.getBrandId());
                if (where != null){
                    where = where.and(brandId);
                }else{
                    where = Specification.where(brandId);
                }
            }

            //Filter cho bộ lọc theo loại sản phẩm
            if (form.getShoeTypeId() != null){
                ShoeSpecification shoeTypeId = new ShoeSpecification("shoeTypeId", form.getShoeTypeId());
                if (where != null){
                    where = where.and(shoeTypeId);
                }else{
                    where = Specification.where(shoeTypeId);
                }
            }

            //Filter cho bộ lọc theo cận dưới của giá sản phẩm
            if (form.getMinPrice() != null){
                ShoeSpecification minPrice = new ShoeSpecification("minPrice", form.getMinPrice());
                if (where != null){
                    where = where.and(minPrice);
                }else{
                    where = Specification.where(minPrice);
                }
            }

            //Filter cho bộ lọc theo cận trên của giá sản phẩm
            if (form.getMaxPrice() != null){
                ShoeSpecification maxPrice = new ShoeSpecification("maxPrice", form.getMaxPrice());
                if (where != null){
                    where = where.and(maxPrice);
                }else{
                    where = Specification.where(maxPrice);
                }
            }

            //Filter cho bộ lọc theo cận trên của giá sản phẩm
            if (form.getEventId() != null){
                ShoeSpecification event = new ShoeSpecification("eventId", form.getEventId());
                if (where != null){
                    where = where.and(event);
                }else{
                    where = Specification.where(event);
                }
            }

            // Filter theo Màu
            if (form.getListShoeColorId() != null && !form.getListShoeColorId().isEmpty()) {
                for (Integer colorId : form.getListShoeColorId()) {
                    ShoeSpecification color = new ShoeSpecification("colorId", colorId);
                    where = where == null ? Specification.where(color) : where.and(color);
                }
            }

            // Filter theo Màu
            if (form.getSize() != null) {
                ShoeSpecification size = new ShoeSpecification("size", form.getSize());
                if (where != null){
                    where = where.and(size);
                }else{
                    where = Specification.where(size);
                }
            }

            if (form.getSpecialSort() != null) {
                ShoeSpecification specialSort = new ShoeSpecification("SpecialSort", form.getSpecialSort());
                if (where != null) {
                    where = where.and(specialSort);
                } else {
                    where = Specification.where(specialSort);
                }
            }

        }


        return where;
    }


}
